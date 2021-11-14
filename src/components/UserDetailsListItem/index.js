import {Component} from 'react'
import {MdDeleteOutline} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import './index.css'

class UserDetailsListItem extends Component {
  state = {
    isChecked: false,
    checkedList: [],
  }

  onChangeCheckbox = event => {
    const {checkedList} = this.state
    this.setState(prevState => ({isChecked: !prevState.isChecked}))

    const selectedCheckbox = checkedList.push({checkedListId: event.target.id})

    // Add item to it

    // Set state
    this.setState(prevState => ({
      checkedList: [...prevState.checkedList, selectedCheckbox],
    }))
  }

  render() {
    const {userDetails, deleteUser} = this.props
    const {id, name, email, role} = userDetails
    const {isChecked, checkedList} = this.state

    const onClickDeleteUser = () => {
      deleteUser(id)
    }

    const clickedCheckBoxStyle = isChecked ? 'list-active' : ''

    const checkboxId = id
    return (
      <>
        <li className={`list-style ${clickedCheckBoxStyle}`}>
          <tr className="user-data-list">
            <td>
              <input
                type="checkbox"
                value={isChecked}
                onChange={this.onChangeCheckbox}
                id={checkboxId}
                checkedListEl={checkedList}
              />
            </td>
            <td className="name-el">{id}</td>
            <td className="name-el">{name}</td>
            <td className="email-el">{email}</td>
            <td className="name-el">{role}</td>
            <td className="name-el">
              <button type="button" className="btn">
                <MdDeleteOutline
                  className="delete"
                  onClick={onClickDeleteUser}
                />
              </button>
              <button type="button" className="btn">
                <FiEdit className="edit" />
              </button>
            </td>
          </tr>
          <hr className="line" />
        </li>
      </>
    )
  }
}
export default UserDetailsListItem
