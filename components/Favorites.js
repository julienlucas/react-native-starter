import React from 'react'
import { StyleSheet, View } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import Avatar from './Avatar'

function Favorites(props) {
  return (
    <View style={styles.list}>
      <View style={styles.avatar_container}>
        <Avatar/>
      </View>
      <FilmList
        films={props.favoritesFilm}
        navigation={props.navigation}
        favoriteList={true}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center'
  }
})


const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)