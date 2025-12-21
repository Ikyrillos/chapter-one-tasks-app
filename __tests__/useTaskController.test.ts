import { useTaskController } from '@/modules/tasks/hooks/useTaskController';
import { act, renderHook } from '@testing-library/react-native';

describe('useTaskController Logic', () => {
  it('should start with an empty list', () => {
    const { result } = renderHook(() => useTaskController());
    expect(result.current.tasks).toEqual([]);
  });

  it('should add a task successfully', () => {
    const { result } = renderHook(() => useTaskController());

    act(() => {
      result.current.addTask('Buy Groceries');
    });

    // Verify functionality without needing to know the exact ID
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe('Buy Groceries');
    expect(result.current.tasks[0].isCompleted).toBe(false);
    expect(result.current.tasks[0].id).toBeDefined(); // Just ensure an ID exists
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTaskController());

    // 1. Add a task
    act(() => {
      result.current.addTask('Task to Delete');
    });

    const taskToDelete = result.current.tasks[0];

    // 2. Delete it using the ID we just generated
    act(() => {
      result.current.deleteTask(taskToDelete.id);
    });

    expect(result.current.tasks.length).toBe(0);
  });

  it('should toggle task completion', () => {
    const { result } = renderHook(() => useTaskController());

    act(() => {
      result.current.addTask('Walk the dog');
    });

    const task = result.current.tasks[0];

    // Toggle True
    act(() => {
      result.current.toggleTaskCompletion(task.id);
    });
    expect(result.current.tasks[0].isCompleted).toBe(true);

    // Toggle False
    act(() => {
      result.current.toggleTaskCompletion(task.id);
    });
    expect(result.current.tasks[0].isCompleted).toBe(false);
  });

  it('should update task title', () => {
    const { result } = renderHook(() => useTaskController());

    act(() => {
      result.current.addTask('Old Title');
    });

    const task = result.current.tasks[0];

    act(() => {
      result.current.updateTask(task.id, 'New Updated Title');
    });

    expect(result.current.tasks[0].title).toBe('New Updated Title');
  });
});