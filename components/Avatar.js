import React, { useState } from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'

function Avatar(props) {
  const avatarClicked = () => {
    ImagePicker.showImagePicker({}, (response) => {
        if (response.didCancel) {
            console.log('L\'utilisateur a annulé')
        }
        else if (response.error) {
            console.log('Erreur : ', response.error)
        }
        else {
            console.log('Photo : ', response.uri )
            let requireSource = { uri: response.uri }

            const action = { type: "SET_AVATAR", value: requireSource}
            props.dispatch(action)
        }
    })
  }

  return (
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => avatarClicked()}>
            <Image style={styles.avatar} source={props.avatar} />
        </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

const mapStateToProps = state => {
  return {
    avatar: state.setAvatar.avatar
  }
}

export default connect(mapStateToProps)(Avatar)