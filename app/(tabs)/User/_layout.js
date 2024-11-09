import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Menu } from 'lucide-react-native';

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="UserScreen"
          options={{
            title: "User",
            headerShown: true,
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            },
            headerTintColor: "white",
           
            headerStyle: {
              backgroundColor: "#6BB239",
              shadowColor: "transparent",
              elevation: 0,
            },
            overlayColor: "#6BB23970",
            drawerActiveTintColor: 'green',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;
