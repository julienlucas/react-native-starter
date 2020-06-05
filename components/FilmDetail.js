import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../api/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
// import EnlargeShrink from '../animations/EnlargeShrink'

function FilmDetail(props) {
    const [film, setFilm] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    const displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                   <ActivityIndicator size='large' />
                </View>
              )
        }
    }

    const navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        if (params.film != undefined && Platform.OS === 'ios') {
            return {
                headerRight: <TouchableOpacity
                                style={styles.share_touchable_headerrightbutton}
                                onPress={() => params.shareFilm()}>
                                <Image
                                    style={styles.share_image}
                                    source={require('../images/ic_share.ios.png')} />
                             </TouchableOpacity>
            }
        }
    }

    const displayFloatingActionButton = () => {
        if (film != undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../images/ic_share.android.png')} />
                </TouchableOpacity>
            )
        }
    }

    const shareFilm = () => {
        Share.share({ title: film.title, message: film.overview })
    }

    const toggleFavorite = () => {
        const action = { type: 'TOGGLE_FAVORITE', value: film }
        props.dispatch(action)
    }

    const updateNavigationParams = () => {
        props.navigation.setParams({
          shareFilm: shareFilm(),
          film: film
        })
    }

    const displayFavoriteImage = () => {
        var sourceImage = require('../images/ic_favorite_border.png')
        var shouldEnlarge = false
        if (props.favoritesFilm.findIndex(item => item.id === film.id) !== -1) {
          sourceImage = require('../images/ic_favorite.png')
          shouldEnlarge = true
        }

        return (
             <Image
               style={styles.favorite_image}
               source={sourceImage}
             />
        )
    }

    useEffect(() => {
        const favoriteFilmIndex = props.favoritesFilm.findIndex(item => item.id === props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) {
            setFilm(props.favoritesFilm[favoriteFilmIndex])
        }
        setIsLoading(true)
        getFilmDetailFromApi(props.navigation.state.params.idFilm).then(data => {
          setFilm(data)
          setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        getFilmDetailFromApi(props.navigation.state.params.idFilm).then((data) => {
            setFilm(data)
            setIsLoading(false)
        })
    }, [props.favoritesFilm])

    // useEffect(() => {
    //     if(isLoading === false) {
    //         updateNavigationParams()
    //     }
    // }, [film, isLoading])

    const displayFilm = () => {
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => toggleFavorite()}>
                        {displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map((genre) => genre.name).join(" / ")}</Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map((company) => company.name).join(" / ")}</Text>
                </ScrollView>
            )
        }
    }

    return (
        <View style={styles.main_container}>
            {displayFilm()}
            {displayLoading()}
            {displayFloatingActionButton()}
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: null,
        height: null,
        flex: 1
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)