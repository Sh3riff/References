import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../Navs/StackNav';
import {Modal, DateScheduler} from '../components';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

// The AvailableDate should be fetched.
const AvailableDate = [5, 6, 7, 9, 13, 14, 15, 16, 19, 22, 26, 29];

const ScheduleDateView = () => {
  // This function is passed as a props to retrieve selected data back to parent state
  const handleDate: (date: number) => void = date => console.log(date);
  return (
    <DateScheduler
      Month="April"
      NoOfDays={31}
      AvailableDate={AvailableDate}
      StartOn="Th"
      handleDate={handleDate}
    />
  );
};

const ScheduleDate = ({navigation}: Props) => {
  const nextPage = () => navigation.navigate('ScheduleTime');
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal
      modalTitle="Select Date for Biometric"
      showModal={showModal}
      setShowModal={setShowModal}
      Content={ScheduleDateView}
      ButtonList={{
        type: 'primary',
        text: 'Select Pick-up Location',
        operator: nextPage,
      }}
    />
  );
};

export default ScheduleDate;
