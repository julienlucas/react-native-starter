import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native'
import FilmList from '../components/FilmList'
import { getFilmsFormApiWithSearchedText } from '../api/TMDBApi'
import { connect } from 'react-redux'

function Search(props) {
    const [films, setFilms] = useState([])
    const [searchedText, setSearchedText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const loadFilms = () => {
        setIsLoading(true)
        if (searchedText.length > 0) {
          getFilmsFormApiWithSearchedText(searchedText, page+1).then(data => {
              setPage(data.page)
              setTotalPages(data.total_pages)
              setFilms([...films, ...data.results])
              setIsLoading(false)
              console.log("Page : " + page + " / TotalPages : " + totalPages + " / Nombre de films : " + films.length)
          })
        }
    }

    const displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                  <ActivityIndicator size='large' />
                </View>
              )
        }
    }

    const searchTextInputChanged = text => {
        setSearchedText(text)
    }

    const searchFilms = () => {
        setPage(0)
        setTotalPages(0)
        setFilms([])
        loadFilms()
    }

    const displayDetailForFilm = idFilm => {
        props.navigation.navigate('FilmDetail', { idFilm: idFilm })
    }

    return (
        <View style={styles.main_container}>
            <TextInput
                onSubmitEditing={() => searchFilms()}
                onChangeText={(text) => searchTextInputChanged(text)}
                style={styles.textinput}
                placeholder='Titre du film'/>
            <Button title='Rechercher' onPress={() => searchFilms()}/>
            <FilmList
                films={films}
                navigation={props.navigation}
                loadFilms={() => loadFilms()}
                page={page}
                totalPages={totalPages}
            />
            {displayLoading()}
        </View>
    )
}

const styles = StyleSheet.create({
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
 })

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)