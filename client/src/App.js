import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';

const APIend = 'http://localhost:3306/user'
class App extends Component {
  state = {
    el: ['userName', 'emailId', 'phoneNo', 'password'],
    ol: ['userName', 'emailId', 'phoneNo', 'password', 'dateTime'],
    userName: '',
    emailId: '',
    phoneNo: '',
    password: '',
    label: {
      userName: 'User Name',
      emailId: 'Email Id',
      phoneNo: 'Phone No',
      password: 'Password',
      dateTime: 'Updated At'
    },
    searchResults: null,
    searchQuery: ''
  }
  handleChange = (ev, field) => {
    ev.preventDefault()
    this.setState({
      [field]: ev.target.value
    })
  }
  Results = ({res}) => (
    <React.Fragment>
      { this.state.ol.map(l => (
        <div className='field' key={l}>
          <div className='label'>{this.state.label[l]}</div>
          <div className={l}>{l === 'dateTime'
           ? res[l].toLocaleString().replace(/T/, ' ').replace(/\..+/, '')
           : res[l]}
          </div>
        </div>
      ))}
    </React.Fragment>
  )
  Form = ({field}) => (
    <div className='element'>
      <label>
        <div>{this.state.label[field]}</div>
        <input type="text" value={this.state[field]} onChange={(ev) => this.handleChange(ev, field)} />
      </label>
    </div>
  )
  addUser = (ev) => {
    ev.preventDefault()
    const {state: {userName, emailId, phoneNo, password}} = this
    axios
      .post(`${APIend}/add`, {userName, emailId, phoneNo, password})
      .then(res => {
        console.log(res);
      })
  }
  search = (ev) => {
    ev.preventDefault()
    const {state: {searchQuery}} = this
    axios
      .get(`${APIend}?query=${JSON.stringify({emailId: searchQuery})}`)
      .then(res => {
        console.log(res);
        this.setState({
          searchResults: res.data
        })
      })
  }
  render() {
    const {state: {el, searchResults, searchQuery}, addUser, search} = this
    return (
      <div className='App'>
        <div className='form'>
          <form onSubmit={addUser}>
            {
              el.map(el => (
                <this.Form field={el} key={el}/>
              ))
            }
            <input type="submit" value="Submit"/>
          </form>
        </div>
        <div className='search'>
          <div className='input'>
            <input type="text" placeholder='Seach for email' value={searchQuery} onChange={(ev) => this.handleChange(ev, 'searchQuery')}/>
            <button className='submit' onClick={search}>Search</button>
          </div>
          <div className='results'>
            {searchResults ? <this.Results res={searchResults}/>: null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
