import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useCounter from '../src/hooks/features/homepage/useCounter';

describe('useCounter Hook', () => {
  let result: any;

  beforeEach(() => {
    const { result: hookResult } = renderHook(() => useCounter());
    result = hookResult;
  });

  describe('Initial State', () => {
    it('should initialize count to 0', () => {
      expect(result.current.count).toBe(0);
    });

    it('should initialize val to 1', () => {
      expect(result.current.val).toBe(1);
    });

    it('should provide increment function', () => {
      expect(typeof result.current.increment).toBe('function');
    });

    it('should provide setVal function', () => {
      expect(typeof result.current.setVal).toBe('function');
    });
  });

  describe('Increment Functionality', () => {
    it('should increment count by default val (1) when increment is called', () => {
      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(1);
    });

    it('should increment count by current val when increment is called multiple times', () => {
      act(() => {
        result.current.increment();
        result.current.increment();
      });

      expect(result.current.count).toBe(2);
    });

    it('should increment count by custom val when val is changed', () => {
      act(() => {
        result.current.setVal(5);
      });

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(5);
    });

    it('should increment count by updated val for subsequent increments', () => {
      // First increment with default val (1)
      act(() => {
        result.current.increment();
      });

      // Change val to 3
      act(() => {
        result.current.setVal(3);
      });

      // Second increment with new val (3)
      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(4); // 1 + 3 = 4
    });
  });

  describe('Val State Management', () => {
    it('should update val when setVal is called', () => {
      act(() => {
        result.current.setVal(10);
      });

      expect(result.current.val).toBe(10);
    });

    it('should handle val being set to 0', () => {
      act(() => {
        result.current.setVal(0);
      });

      expect(result.current.val).toBe(0);

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(0); // count + 0 = 0
    });

    it('should handle negative val values', () => {
      act(() => {
        result.current.setVal(-5);
      });

      expect(result.current.val).toBe(-5);

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(-5); // 0 + (-5) = -5
    });

    it('should handle large val values', () => {
      act(() => {
        result.current.setVal(1000);
      });

      expect(result.current.val).toBe(1000);

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(1000);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle multiple increments with different val values', () => {
      // Start with count = 0, val = 1
      
      // First increment: count = 0 + 1 = 1
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(1);

      // Change val to 5
      act(() => {
        result.current.setVal(5);
      });

      // Second increment: count = 1 + 5 = 6
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(6);

      // Change val to 2
      act(() => {
        result.current.setVal(2);
      });

      // Third increment: count = 6 + 2 = 8
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(8);
    });

    it('should maintain state independence between different hook instances', () => {
      const { result: result1 } = renderHook(() => useCounter());
      const { result: result2 } = renderHook(() => useCounter());

      // Modify first hook instance
      act(() => {
        result1.current.setVal(10);
      });

      act(() => {
        result1.current.increment();
      });

      // Modify second hook instance
      act(() => {
        result2.current.setVal(5);
      });

      act(() => {
        result2.current.increment();
      });

      // Check that instances are independent
      expect(result1.current.count).toBe(10);
      expect(result1.current.val).toBe(10);
      expect(result2.current.count).toBe(5);
      expect(result2.current.val).toBe(5);
    });

    it('should handle rapid successive increments', () => {
      act(() => {
        result.current.setVal(2);
      });

      // Perform multiple rapid increments
      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.increment();
        }
      });

      expect(result.current.count).toBe(10); // 2 * 5 = 10
    });
  });

  describe('Edge Cases', () => {
    it('should handle decimal val values', () => {
      act(() => {
        result.current.setVal(1.5);
      });

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(1.5);
    });

    it('should handle string val conversion', () => {
      act(() => {
        // TypeScript would catch this, but testing runtime behavior
        result.current.setVal('5' as any);
      });

      expect(result.current.val).toBe('5');

      act(() => {
        result.current.increment();
      });

      // JavaScript coercion: 0 + '5' = '05'
      expect(result.current.count).toBe('05');
    });

    it('should handle NaN val values', () => {
      act(() => {
        result.current.setVal(NaN);
      });

      expect(result.current.val).toBeNaN();

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBeNaN();
    });
  });
});
