import {Component} from 'react'
import {MdDeleteOutline} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import './index.css'

class UsersDataView extends Component {
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
    const {userDetails, deleteUser, editUserItem, toggleCheckBoxes} = this.props
    const {id, name, email, role} = userDetails
    const {isChecked} = this.state

    const onClickDeleteUser = () => {
      deleteUser(id)
    }

    const onClickCheckBoxes = () => {
      toggleCheckBoxes(userDetails.id)
    }

    const onClickEdit = () => {
      editUserItem(userDetails.id)
    }

    // const clickedCheckBoxStyle = isChecked ? 'list-active' : ''

    return (
      <li className={userDetails.select && 'select'}>
        <li className="list-style1">
          <td>
            <input
              type="checkbox"
              value={isChecked}
              onChange={onClickCheckBoxes}
              checked={userDetails.select}
            />
          </td>
          <td className="name-el">{id}</td>
          <td className="name-el">{name}</td>
          <td className="email-el">{email}</td>
          <td className="name-el">{role}</td>
          <td className="name-el">
            <button type="button" className="btn">
              <MdDeleteOutline className="delete" onClick={onClickDeleteUser} />
            </button>
            <button type="button" className="btn" onClick={onClickEdit}>
              <FiEdit className="edit" />
            </button>
          </td>
        </li>
        <hr className="line1" />
      </li>
    )
  }
}
export default UsersDataView
