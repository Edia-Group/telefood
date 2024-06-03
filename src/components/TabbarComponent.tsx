import { useState } from 'react';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { TabbarItem } from '@telegram-apps/telegram-ui/dist/components/Layout/Tabbar/components/TabbarItem/TabbarItem';
import { FaFeather, FaGhost } from "react-icons/fa";

const TabbarComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Initial selected index

  const handleTabClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Tabbar>
      <TabbarItem text="Hello" selected={selectedIndex === 0} onClick={() => handleTabClick(0)} >
        <FaGhost />
      </TabbarItem>

      <TabbarItem text="Carl" selected={selectedIndex === 1} onClick={() => handleTabClick(1)} >
        <FaFeather />
      </TabbarItem>
    </Tabbar>
  );
};

export default TabbarComponent;
