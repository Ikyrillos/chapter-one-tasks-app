import { Ionicons } from '@expo/vector-icons'; // Built-in with Expo
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../models/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.contentContainer} 
        onPress={() => onToggle(task.id)}
      >
        <Ionicons 
          name={task.isCompleted ? "checkbox" : "square-outline"} 
          size={24} 
          color={task.isCompleted ? "#4CAF50" : "#666"} 
        />
        <Text style={[styles.text, task.isCompleted && styles.textCompleted]}>
          {task.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#AAA',
  },
  deleteButton: {
    padding: 4,
  },
});