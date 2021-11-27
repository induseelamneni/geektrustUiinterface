import {Component} from 'react'
import './index.css'

class EditUsers extends Component {
  state = {
    updatedUsers: {},
  }

  componentDidMount() {
    this.updatedUsersDetails()
  }

  updatedUsersDetails = () => {
    const {userDetails} = this.props
    const newUser = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      role: userDetails.role,
      select: userDetails.select,
    }
    this.setState({updatedUsers: newUser})
  }

  changeInput = event => {
    const {updatedUsers} = this.state
    const inputName = event.target.name

    const inputValue = event.target.value

    const newUserData = {...updatedUsers}
    newUserData[inputName] = inputValue
    this.setState({updatedUsers: newUserData})
  }

  onClickCancel = () => {
    const {userDetails, cancelUpdates} = this.props
    cancelUpdates(userDetails.id)
  }

  onClickSave = () => {
    const {saveChanges} = this.props
    const {updatedUsers} = this.state

    saveChanges(updatedUsers)
  }

  render() {
    const {updatedUsers} = this.state
    return (
      <>
        <li className="list-style1">
          <td>
            <input type="checkbox" />
          </td>
          <td className="name-el">{updatedUsers.id}</td>
          <td className="name-el">
            <input
              type="text"
              name="name"
              value={updatedUsers.name}
              onChange={this.changeInput}
              className="edit-input"
            />
          </td>
          <td className="email-el">
            <input
              type="text"
              name="email"
              value={updatedUsers.email}
              onChange={this.changeInput}
              className="edit-input"
            />
          </td>
          <td className="name-el">
            <input
              type="text"
              name="role"
              value={updatedUsers.role}
              onChange={this.changeInput}
              className="edit-input"
            />
          </td>

          <td>
            <button
              type="button"
              onClick={this.onClickSave}
              className="save-btn"
            >
              Save
            </button>
            <button
              type="button"
              onClick={this.onClickCancel}
              className="cancel-btn"
            >
              Cancel
            </button>
          </td>
        </li>
        <hr className="line1" />
      </>
    )
  }
}

export default EditUsers
