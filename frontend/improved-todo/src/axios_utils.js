const API_BASE_URL = "_API_BASE_URL"
const API_A_BASE_URL = API_BASE_URL + "auth/"
const API_C_BASE_URL = API_BASE_URL + "content/"

import { createReturnStatement } from '@vue/compiler-core'
import axios from 'axios'

function defaultHeaders(sessionID) {
    return  { 'Content-Type': 'application/json', 'Bearer': sessionID }
}

function defaultConfig(sessionID) {
    return { headers: defaultHeaders(sessionID) }
}

export const axios_utils = {

    refreshToken(refreshToken) {
        return axios({
            method: 'post',
            url: API_A_BASE_URL + 'refresh/',
            data: {
                refreshToken: refreshToken,
            }
        })
    },

    signIn(userName, password) {
        return axios({
            method: 'post',
            url: API_A_BASE_URL + 'sign-in/',
            data: {
                username: userName,
                password: password
            }
        })
    },

    signUp(userName, password) {
        return axios({
            method: 'post',
            url: API_A_BASE_URL + 'sign-up/',
            data: {
                username: userName,
                password: password
            }
        })
    },

    getUser(userId, sessionID) {
        return axios.get(API_C_BASE_URL + 'user/' + userId + '/', defaultConfig(sessionID))
    },

    getTeams(user) {
        return axios.get(API_C_BASE_URL + 'team/', defaultConfig(user.sessionID))
    },
    getBoards(user, team) {
        let url = API_C_BASE_URL + 'team/' + team.id + '/board/'
        return axios.get(url, defaultConfig(user.sessionID))
    },
    getTeam(user, teamId) {
        let url = API_C_BASE_URL + 'team/' + teamId + '/'
        return axios.get(url, defaultConfig(user.sessionID))
    },
    createTeam(user, teamName, teamPass) {
        return axios({
            method: 'post',
            url: API_C_BASE_URL + 'team/',
            data: {name: teamName, password: teamPass},
            headers: defaultHeaders(user.sessionID)
        })
    },
    joinTeam(user, teamId, teamPass) {
        return axios({
            method: 'post',
            url: API_C_BASE_URL + 'team/' + teamId + '/join/',
            data: {password: teamPass},
            headers: defaultHeaders(user.sessionID)
        })
    },
    leaveTeam(user, teamId) {
        return axios({
            method: 'post',
            url: API_C_BASE_URL + 'team/' + teamId + '/leave/',
            headers: defaultHeaders(user.sessionID)
        })
    },
    deleteTeam(user, teamId) {
        return axios({
            method: 'delete',
            url: API_C_BASE_URL + 'team/' + teamId + '/',
            headers: defaultHeaders(user.sessionID)
        })
    },
    deleteBoard(user, teamId, boardId) {
        return axios({
            method: 'delete',
            url: API_C_BASE_URL + 'team/' + teamId + '/board/' +  boardId + '/',
            headers: defaultHeaders(user.sessionID)
        })
    },
    getBoard(user, teamId, boardId) {
        let url = API_C_BASE_URL + 'team/' + teamId + '/board/' + boardId + '/'
        return axios.get(url, defaultConfig(user.sessionID))
    },
    createBoard(user, teamId, boardName) {
        return axios({
            method: 'post',
            url: API_C_BASE_URL + 'team/' + teamId + '/board/',
            data: {name: boardName},
            headers: defaultHeaders(user.sessionID)
        })
    },
    getTasks(user, teamId, boardId) {
        let url = API_C_BASE_URL + 'team/' + teamId + '/board/' + boardId + '/task/'
        return axios.get(url, defaultConfig(user.sessionID))
    },
    getTask(user, teamId, boardId, taskId) {
        let url = API_C_BASE_URL + 'team/' + teamId + '/board/' + boardId + '/task/' + taskId + '/'
        return axios.get(url, defaultConfig(user.sessionID))
    },
    createTask(user, teamId, boardId, task) {
        return axios({
            method: 'post',
            url: API_C_BASE_URL + 'team/' + teamId + '/board/' + boardId + '/task/',
            data: task,
            headers: defaultHeaders(user.sessionID)
        })
    },
    deleteTask(user, teamId, boardId, taskId) {
        return axios({
            method: 'delete',
            url: API_C_BASE_URL + 'team/' + teamId + '/board/' + boardId + '/task/' + taskId + '/',
            headers: defaultHeaders(user.sessionID)
        })
    },
    markTask(user, teamId, boardId, taskId, solved) {
        return axios({
            method: 'post',
            url: API_C_BASE_URL + 'team/' + teamId + '/board/' + boardId + '/task/' + taskId + '/mark/',
            data: {solved: solved},
            headers: defaultHeaders(user.sessionID)
        })
    },
}
