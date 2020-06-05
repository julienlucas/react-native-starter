import React from 'react'
import { StyleSheet, View } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'

function Favorites(props) {
  return (
    <View style={styles.list}>
      <FilmList
        films={props.favoritesFilm}
        navigation={props.navigation}
        favoriteList={true}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  list: {
    position: 'relative',
    top: 50
  }
})


const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)