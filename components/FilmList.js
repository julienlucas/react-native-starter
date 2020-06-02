import React from 'react'
import { FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

function FilmList(props) {

  const displayDetailForFilm = idFilm => {
    console.log('Display film ' + idFilm)
    props.navigation.navigate('FilmDetail', {idFilm: idFilm})
  }

  return (
    <FlatList
        data={props.films}
        extraData={props.favoritesFilm}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) =>
            <FilmItem
                film={item}
                isFilmFavorite={(props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                displayDetailForFilm={() => {const idFilm = item.id; displayDetailForFilm(idFilm)}}
            />
        }
        onEndReachedThreshold={.5}
        onEndReached={() => {
          if (props.page < props.totalPages) {
            props.loadFilms()
          }
        }}
    />
  )
}

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmList)