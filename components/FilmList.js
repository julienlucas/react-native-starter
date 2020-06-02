import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

function FilmList(props) {

  const displayDetailForFilm = idFilm => {
    console.log('Display film ' + idFilm)
    props.navigation.navigate('FilmDetail', {idFilm: idFilm})
  }

  return (
    <FlatList
        style={styles.list}
        data={props.films}
        extraData={props.favoritesFilm}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <FilmItem
                film={item}
                isFilmFavorite={(props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                displayDetailForFilm={() => displayDetailForFilm()}
            />
        )}
        onEndReachedThreshold={.5}
        onEndReached={() => {
            if (props.page < props.totalPages) {
                props.loadFilms()
            }
        }}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmList)