import { TaskItem } from '@/modules/tasks/components/TaskItem';
import { useTaskController } from '@/modules/tasks/hooks/useTaskController';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import type { Task } from '@/modules/tasks/models/Task';
import { EditTaskModal } from '../components/EditTaskModal';

export default function TasksScreen() {
  const { tasks, addTask, deleteTask, toggleTaskCompletion, updateTask } = useTaskController();
  
  const [inputText, setInputText] = useState('');
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleAddTask = () => {
    addTask(inputText);
    setInputText(''); 
    Keyboard.dismiss(); 
  };

  const handleEditPress = (task: Task) => {
    setTaskToEdit(task);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (id: string, newTitle: string) => {
    updateTask(id, newTitle);
    setEditModalVisible(false);
    setTaskToEdit(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* FIX: Wrap the ENTIRE content in KeyboardAvoidingView.
        This ensures the FlatList shrinks and the Input stays visible.
      */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // Offset is crucial: Adjusts for Status Bar / SafeArea on iOS
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} 
      >
        
        <View style={styles.header}>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>{tasks.filter(t => !t.isCompleted).length} pending</Text>
        </View>

        <View style={styles.content}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TaskItem 
                task={item} 
                onToggle={toggleTaskCompletion} 
                onDelete={deleteTask} 
                onEdit={handleEditPress}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tasks yet. Add one below!</Text>
              </View>
            }
          />
        </View>

        {/* Input Area is now INSIDE the main wrapper */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a task"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>

      <EditTaskModal 
        visible={isEditModalVisible}
        task={taskToEdit}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveEdit}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean white background (matches website body)
  },
  header: {
    paddingHorizontal: 24, // Wider spacing for a modern look
    paddingTop: 20,
    paddingBottom: 20,
    // Optional: add a subtle border like the website's nav bar
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6', 
  },
  title: {
    fontSize: 32, // Larger, bolder header
    fontWeight: '800', // Extra bold (matches "About Chapter One")
    color: '#111827', // Dark Charcoal
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563', // Soft gray for body text
    marginTop: 8,
    lineHeight: 22,
  },
  content: {
    flex: 1, 
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyState: {
    marginTop: 80,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
  inputWrapper: {
    padding: 24,
    backgroundColor: '#FFFFFF', 
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB', 
    borderRadius: 50, 
    paddingRight: 6,
    paddingLeft: 24,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 48, // Taller touch target
    fontSize: 16,
    color: '#1F2937',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#EF4444', // Brand Red
    borderRadius: 9999, // Circle
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444', // Colored shadow glow
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});