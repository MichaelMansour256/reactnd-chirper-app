import {saveLikeToggle, saveTweet} from '../utils/api' 
import {showLoading,hideLoading} from 'react-redux-loading'
export const RECEIVE_TWEETS="RECEIVE_TWEETS"
export const TOGGLE_TWEET="TOGGLE_TWEET"
export const ADD_TWEET="ADD_TWEET"
function addTweet(tweet){
    return {
        type:ADD_TWEET,
        tweet
    }
}
export function handleAddTweet(text,replyingTo){

    return (dispatch,getState)=>{
        const {authUser}=getState()
        dispatch(showLoading())
        return saveTweet({
            text,
            author:authUser,
            replyingTo
        })
        .then((tweet)=>dispatch(addTweet(tweet)))
        .then(dispatch(hideLoading()))
    }
}
export function receiveTweets(tweets){
    return {
        type:RECEIVE_TWEETS,
        tweets
    }
}

function toggleTweet({id,authUser,hasLiked}){
    return {
        type: TOGGLE_TWEET,
        id,
        authUser,
        hasLiked
    }
}

export function handleToggleTweet(info){
    return (dispatch)=>{
        dispatch(toggleTweet(info))
        return saveLikeToggle(info).catch((e)=>{
            console.warn("error in handel toggle tweet ",e)
            dispatch(toggleTweet(info))
            alert("error happend try again")
        })

        }
}
