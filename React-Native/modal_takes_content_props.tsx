import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  Content: () => JSX.Element;
};

const ModalView = ({showModal, setShowModal, Content}: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}>
      <View style={styles.Background}>
        <View style={styles.modal}>
          <Content />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Background: {
    height: hp('80%'),
    marginTop: hp('20%'),
  },
  modal: {
    flex: 1,
    borderTopLeftRadius: hp('3%'),
    borderTopRightRadius: hp('3%'),
    backgroundColor: 'lightgrey',
  }
});

export default ModalView;
