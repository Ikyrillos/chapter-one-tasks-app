import { useTaskController } from '@/modules/tasks/hooks/useTaskController';
import { act, renderHook } from '@testing-library/react-native';

describe('useTaskController Logic', () => {
  it('should start with an empty list', () => {
    const { result } = renderHook(() => useTaskController());
    expect(result.current.tasks).toEqual([]);
  });

  it('should add a task', () => {
    const { result } = renderHook(() => useTaskController());

    act(() => {
      result.current.addTask('Buy Milk');
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe('Buy Milk');
    expect(result.current.tasks[0].isCompleted).toBe(false);
  });

  it('should toggle a task', () => {
    const { result } = renderHook(() => useTaskController());

    // 1. Add Task
    act(() => {
      result.current.addTask('Walk Dog');
    });
    
    const taskId = result.current.tasks[0].id;

    // 2. Toggle it
    act(() => {
      result.current.toggleTaskCompletion(taskId);
    });

    expect(result.current.tasks[0].isCompleted).toBe(true);
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTaskController());

    act(() => {
      result.current.addTask('Delete Me');
    });
    
    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks.length).toBe(0);
  });
});