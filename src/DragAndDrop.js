import React,{Component} from 'react'; 
import { CSVReader } from 'react-papaparse';
import axios from 'axios';
import {Table, Modal, Button} from 'react-bootstrap';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  InstapaperShareButton,
  InstapaperIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class DragAndDrop extends Component { 

	constructor(props){
    super(props);
    this.state = {user:[], show: false};
  }
  
  
  componentDidMount(){
    axios.get('https://cephs-images-api.herokuapp.com/api/v1/leaderBoard')
    .then(res=> {
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })
  }
    handleClose = () => {
      
      this.setState({show: false})
    };
    handleShow = (person,i) => {
      this.setState({show: true, shareDetails: person[1], position: i })
    };

  handleReadCSV = data => {
    console.log(data[0])
    let userObj = {};
    const arr = [] 
    data.map(data=>{
      // console.log(data.data)
      arr.push(data.data)
    })
    arr.sort(compareSecondColumn);

    function compareSecondColumn(a, b) {
        if (a[3] === b[3]) {
            return 0;
        }
        else {
            return (a[3] < b[3]) ? 1 : -1;
        }
    }
    // console.log(arr[1])
    this.setState({user:arr});
  }

  handleClick = (e)=>{
    console.log(e)
  }

  render() {
    const {show} = this.state;
    return (
      <div>
        {/* ---------modal ------------------- */}
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              HNG LEADER SCOREBOARD
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 class="text-center">{`Hello ${this.state.shareDetails}, what social medium do you want to share your score`}</h5>
            <div className="flex-space-between">
            <TwitterShareButton
              url={'https://twitter.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
            <FacebookShareButton
              url={'https://facebook.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
            <InstapaperShareButton
              url={'https://instagram.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <InstapaperIcon
                size={32}
                round />
            </InstapaperShareButton>
            <LinkedinShareButton
              url={'https://linkedin.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <LinkedinIcon
                size={32}
                round />
            </LinkedinShareButton>
            <TelegramShareButton
              url={'https://Telegram.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <TelegramIcon
                size={32}
                round />
            </TelegramShareButton>
            <WhatsappShareButton
              url={'https://whatsapp.com'}
              title={`Hello friends, come see my position on the leaderboard: I was position number: ${this.state.position}`}
              className="">
              <WhatsappIcon
                size={32}
                round />
            </WhatsappShareButton>
  

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* -------------modal------------- */}
        
      <i class="fas fa-share-alt-square"></i> 

        <CSVReader
          className="csv-container"
          onFileLoad={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: "none"}}
          onError={this.handleOnError}
        >
          <h2>Click here to upload csv files or Drag and drop it. It should be in HNG Leaderboard Format</h2>
        </CSVReader>
        <Table striped bordered hover className={'table'}>
      <tbody>
      {this.state.user.map((person, i) => (

        <tr 
        onClick={ ()=> this.handleClick(i)} 
        id={i}>
          {
            i === 0 
            ? 
            <>
              <td>{"#"}</td>
              <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>{person[0]}</td>
              <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>{person[1]}</td>
              <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>{person[2]}</td>
              <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>{person[3]}</td>
              <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }></td>
          </>
        :
          <>
            <td>{i}</td>
            <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>{person[0]}</td>
            <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>{person[1]}</td>
            <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>{person[2]}</td>
            <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>{person[3]}</td>
            <td className={(i === 1 |i === 2 |i === 3) ? "dark" : "" }>
              
          <Button variant="primary" onClick={()=>this.handleShow(person, i)}>
            share
          </Button></td>
        </>
          }
        </tr>
        ))}
      </tbody>
    </Table>
      </div>
    );
  }
} 

export default DragAndDrop;