/* eslint-disable no-param-reassign */
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import {BsSearch} from 'react-icons/bs'

import EditUser from '../EditUser'
import UsersDataView from '../UsersDataView'
import Pagination from '../Pagination'

const fetchedDataStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const usersPerPageCount = 10

// AdminUI Component

class AdminUI extends Component {
  state = {
    dataStatus: fetchedDataStatus.initial,

    userData: [],
    searchUserData: '',
    editUserId: null,
    activePageNumber: 1,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  // Fetching Data

  getUserDetails = async () => {
    this.setState({dataStatus: fetchedDataStatus.inProgress})
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    if (response.ok) {
      const data = await response.json()

      const formattedData = data.map(each => ({
        id: each.id,
        name: each.name,
        email: each.email,
        role: each.role,
      }))

      this.setState({
        userData: formattedData,
        dataStatus: fetchedDataStatus.success,
      })
    } else {
      this.setState({
        dataStatus: fetchedDataStatus.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchUserData: event.target.value.toLowerCase(),
    })
  }

  editUserItem = id => {
    const {editUserId} = this.state
    return editUserId
      ? this.setState({editUserId: null})
      : this.setState({editUserId: id})
  }

  deleteUser = id => {
    const {userData} = this.state
    const filteredUsersData = userData.filter(each => each.id !== id)
    this.setState({
      userData: filteredUsersData,
    })
  }

  saveUserItem = newUser => {
    const {userData} = this.state
    const saveUserData = userData.map(eachUser => {
      if (eachUser.id === newUser.id) return newUser
      return eachUser
    })
    this.setState({userData: saveUserData, editUserId: null})
  }

  toggleCheckBoxes = id => {
    const {userData} = this.state
    const updatedUserData = userData.map(eachUser => {
      if (eachUser.id === id) {
        eachUser.select = !eachUser.select
      }
      return eachUser
    })
    this.setState({userData: updatedUserData})
  }

  onSelectingAll = event => {
    const {userData, activePageNumber} = this.state
    const selectingUserData = userData
      .slice(activePageNumber * 10 - 10, activePageNumber * 10)
      .map(eachUser => {
        eachUser.select = event.target.checked
        return eachUser
      })
    userData.slice(activePageNumber * 10 - 10, 10, ...selectingUserData)
    this.setState({userData})
  }

  deleteMultipleUsers = () => {
    const {userData} = this.state
    const remainingUsers = userData.filter(each => !each.select)
    this.setState({userData: remainingUsers})
  }

  changePageNumber = num => {
    this.setState({activePageNumber: num})
  }

  // When Data Fetching Failure Retry Button

  retryRenderData = () => {
    this.getUserDetails()
  }

  // Data Fetching Success View

  successDataView = () => {
    const {
      userData,
      searchUserData,

      activePageNumber,
      editUserId,
    } = this.state
    const searchResults = userData.filter(
      eachUser =>
        eachUser.name.toLowerCase().includes(searchUserData) ||
        eachUser.email.toLowerCase().includes(searchUserData) ||
        eachUser.role.toLowerCase().includes(searchUserData),
    )

    const lastUserIndex = activePageNumber * usersPerPageCount

    const firstUserIndex = lastUserIndex - usersPerPageCount

    const currentUserData = searchResults.slice(firstUserIndex, lastUserIndex)

    const totalPagesCount = Math.ceil(searchResults.length / usersPerPageCount)

    return (
      <>
        <div className="search-input-container">
          <input
            type="text"
            className="search-form"
            value={searchUserData}
            onChange={this.onChangeSearchInput}
            placeholder="Search by name, email or role"
          />
          <BsSearch className="search-icon" />
        </div>
        <ul className="ul-container">
          <li className="list-style">
            <tr className="user-data-list">
              <td>
                <input type="checkbox" onClick={this.onSelectingAll} />
              </td>
              <th className="name-el">S.no</th>
              <th className="name-el">Name</th>
              <th className="name-el">Email</th>
              <th className="name-el">Role</th>
              <th className="name-el">Actions</th>
            </tr>
            <hr />
          </li>
          {currentUserData.map(eachUser => (
            <div key={eachUser.id} className="list-style">
              {editUserId === eachUser.id ? (
                <EditUser
                  userDetails={eachUser}
                  saveChanges={this.saveUserItem}
                  cancelUpdates={this.editUserItem}
                />
              ) : (
                <UsersDataView
                  userDetails={eachUser}
                  editUserItem={this.editUserItem}
                  toggleCheckBoxes={this.toggleCheckBoxes}
                  deleteUser={this.deleteUser}
                />
              )}
            </div>
          ))}
        </ul>

        <Pagination
          totalPagesCount={totalPagesCount}
          activePageNumber={activePageNumber}
          changePageNumber={this.changePageNumber}
          deleteMultipleUsers={this.deleteMultipleUsers}
        />
      </>
    )
  }

  // Data Loading View

  LoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  // Data Fetching Failure View

  failureDataView = () => (
    <div className="loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-img"
      />
      <button
        type="button"
        onClick={this.retryRenderData}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  // According to fetched Data Switch to that View

  renderData = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case fetchedDataStatus.success:
        return this.successDataView()
      case fetchedDataStatus.failure:
        return this.failureDataView()
      case fetchedDataStatus.inProgress:
        return this.LoadingView()
      default:
        return null
    }
  }

  submitForm = event => {
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.submitForm} className="form">
        {this.renderData()}
      </form>
    )
  }
}

export default AdminUI
