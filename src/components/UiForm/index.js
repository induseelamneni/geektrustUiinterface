import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import {BsSearch} from 'react-icons/bs'

import UserDetailsListItem from '../UserDetailsListItem'

const initialUserDetailsList = [
  {id: '1', name: 'Aaron Miles', email: 'aaron@mailinator.com', role: 'member'},
  {
    id: '2',
    name: 'Aishwarya Naik',
    email: 'aishwarya@mailinator.com',
    role: 'member',
  },
  {
    id: '3',
    name: 'Arvind Kumar',
    email: 'arvind@mailinator.com',
    role: 'admin',
  },
]

class UiForm extends Component {
  state = {
    isLoading: true,
    userData: initialUserDetailsList,
    searchUserData: '',
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const response = await fetch(
      ' https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    const data = await response.json()
    const formattedData = data.map(each => ({
      id: each.id,
      name: each.name,
      email: each.email,
      role: each.role,
    }))

    this.setState({userData: formattedData, isLoading: false})
  }

  submitForm = event => {
    event.preventDefault()
  }

  onChangeSearchInput = event => {
    this.setState({
      searchUserData: event.target.value,
    })
  }

  deleteUser = id => {
    const {userData} = this.state
    const filteredUsersData = userData.filter(each => each.id !== id)
    this.setState({
      userData: filteredUsersData,
    })
  }

  render() {
    const {userData, searchUserData, isLoading} = this.state
    const searchResults = userData.filter(eachUser =>
      eachUser.name.toLowerCase().includes(searchUserData.toLowerCase()),
    )
    const {checkedListEl} = this.props

    console.log(checkedListEl)

    return (
      <form onSubmit={this.submitForm} className="form">
        <div className="search-input-container">
          <input
            type="text"
            className="search-form"
            value={searchUserData}
            onChange={this.onChangeSearchInput}
            placeholder="Search by name"
          />
          <BsSearch />
        </div>
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <>
            <ul className="ul-container">
              <li className="list-style">
                <tr className="user-data-list">
                  <p>{'  '}</p>
                  <td className="name-el">S.no</td>
                  <td className="name-el">Name</td>
                  <td className="name-el">Email</td>
                  <td className="name-el">Role</td>
                  <td className="name-el">Actions</td>
                </tr>
                <hr />
              </li>
              {searchResults.map(eachUserData => (
                <UserDetailsListItem
                  key={eachUserData.id}
                  userDetails={eachUserData}
                  deleteUser={this.deleteUser}
                  handleCheckChildElement={this.handleCheckChildElement}
                />
              ))}
            </ul>
            <button type="button" className="delete-button">
              DeleteSelected
            </button>
          </>
        )}
      </form>
    )
  }
}

export default UiForm
