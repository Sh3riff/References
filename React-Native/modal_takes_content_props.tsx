import React from 'react';
import {Modal, StyleSheet, View, ScrollView} from 'react-native';
import {Texts, Buttons} from '../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

type ModalProps = {
  modalTitle: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  Content: () => JSX.Element;
  ButtonList: {
    type: 'primary' | 'secondary';
    text: string;
    operator: () => void;
  };
};

const ModalView = ({
  modalTitle,
  showModal,
  setShowModal,
  Content,
  ButtonList,
}: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}>
      <View style={styles.Background}>
        <View style={styles.modal}>
          <View style={styles.headerContainer}>
            <Texts type="Title" content={modalTitle} />
          </View>
          <ScrollView>
            <Content />
          </ScrollView>
          <View>
            <Buttons
              type={ButtonList.type}
              text={ButtonList.text}
              operator={ButtonList.operator}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Background: {
    height: hp('100%'),
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modal: {
    height: hp('80%'),
    marginTop: hp('20%'),
    borderTopLeftRadius: hp('3%'),
    borderTopRightRadius: hp('3%'),
    backgroundColor: 'lightgrey',
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginVertical: hp('4%'),
  },
  ButtonContainer: {
    marginVertical: hp('1%'),
  },
});

export default ModalView;
