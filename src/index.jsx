import React, { useState, useRef, useEffect } from 'react';

/**
 * Material Design "Snake" Spinner
 * A simple ring that spins.
 */
const MaterialSpinner = ({ className, style, color }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    style={{ width: '24px', height: '24px', ...style }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="31.4 31.4" // Creates a half-circle arc (approx 50% of circumference)
      transform="rotate(-90 12 12)"
    />
  </svg>
);

/**
 * Material Design Curved Arrow
 * An arc with an arrowhead, exactly like native Android.
 */
const MaterialArrow = ({ style, color }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: '24px', height: '24px', ...style }}
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* The Arc: Starts top-right, curves down to bottom */}
    <path d="M12 5c-3.866 0-7 3.134-7 7 0 3.866 3.134 7 7 7 3.866 0 7-3.134 7-7" strokeOpacity="0.3" />
    <path d="M12 5c3.866 0 7 3.134 7 7 0 3.866-3.134 7-7 7" />
    {/* The Arrow Head */}
    <path d="M19 12l-4-4" />
    <path d="M19 12l4-4" />
  </svg>
);

// Simplified Material Arrow (Just the main curve + arrow, typical for PTR)
const SimpleMaterialArrow = ({ style, color }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: '24px', height: '24px', ...style }}
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z" />
    <path d="M12 2l-4 4" />
    <path d="M12 2l4 4" />
  </svg>
);

// Accurate Android Material Arrow path
const AndroidArrow = ({ style, color, opacity }) => (
   <svg
    viewBox="0 0 24 24"
    style={{ width: '24px', height: '24px', ...style, opacity }}
    fill={color} // Android arrow is usually filled, not stroked
   >
     <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
   </svg>
);


export const PullToRefresh = ({
  children,
  onRefresh = () => Promise.resolve(), // Default to no-op promise
  threshold = 80,
  maxPull = 180,
  color = '#2563eb', // Default Blue
  backgroundColor = '#ffffff'
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [state, setState] = useState('idle');
  const [isDragging, setIsDragging] = useState(false);
  const contentRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Inject styles for animations
  useEffect(() => {
    const styleId = 'pull-to-refresh-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @keyframes ptr-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .ptr-spinner { animation: ptr-spin 1.2s linear infinite; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const reset = () => {
    setPullDistance(0);
    setState('idle');
    setIsDragging(false);
  };

  const getClientY = (e) => {
    return e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleStart = (e) => {
    const scrollTop = window.scrollY || (contentRef.current ? contentRef.current.scrollTop : 0);
    if (scrollTop > 1) return;

    setIsDragging(true);
    startY.current = getClientY(e);
    currentY.current = startY.current;
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    
    const scrollTop = window.scrollY || (contentRef.current ? contentRef.current.scrollTop : 0);
    if (scrollTop > 1) {
      setIsDragging(false);
      setPullDistance(0);
      return;
    }

    currentY.current = getClientY(e);
    const diff = currentY.current - startY.current;

    if (diff > 0) {
      if (e.cancelable) e.preventDefault();
      const resistance = Math.pow(diff, 0.8); 
      const newDistance = Math.min(resistance, maxPull);
      setPullDistance(newDistance);
      
      if (state !== 'refreshing' && state !== 'complete') {
        setState(newDistance > threshold ? 'ready' : 'pulling');
      }
    }
  };  const handleEnd = async () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (pullDistance > threshold) {
      setState('refreshing');
      setPullDistance(threshold + 10); 
      
      try {
        // Explicit check for function existence
        if (typeof onRefresh === 'function') {
          await onRefresh();
        }
        setState('complete');
        setTimeout(() => reset(), 400);
      } catch (error) {
        console.error("Refresh failed", error);
        reset();
      }
    } else {
      reset();
    }
  };

  const getBubbleStyle = () => {
    let translateY = -60;
    let scale = 0;
    let opacity = 0;

    if (state === 'refreshing' || state === 'complete') {
      translateY = 70;
      scale = 1;
      opacity = 1;
    } else if (pullDistance > 0) {
      translateY = Math.max(pullDistance - 30, -10);
      scale = Math.min(pullDistance / 40, 1);
      opacity = Math.min(pullDistance / 20, 1);
    }

    return {
      transform: `translate3d(-50%, ${translateY}px, 0) scale(${scale})`,
      opacity,
      backgroundColor,
      position: 'absolute',
      left: '50%',
      top: '0',
      zIndex: 9999,
      borderRadius: '50%',
      boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)', // Material Elevation 6
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      pointerEvents: 'none',
      transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
    };
  };

  return (
    <div
      style={{ position: 'relative', minHeight: '100vh', width: '100%', touchAction: 'pan-y', userSelect: 'none' }}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div style={getBubbleStyle()}>
        {(state === 'refreshing' || state === 'complete') ? (
          <MaterialSpinner className="ptr-spinner" color={color} />
        ) : (
          <AndroidArrow
            color={color}
            opacity={Math.min(pullDistance / 40, 1)}
            style={{
              transform: `rotate(${Math.min((pullDistance / threshold) * 360, 360)}deg)`,
              transition: 'opacity 0.2s'
            }}
          />
        )}
      </div>

      <div ref={contentRef} style={{ minHeight: '100vh', opacity: state === 'refreshing' ? 0.5 : 1, transition: 'opacity 0.3s' }}>
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;