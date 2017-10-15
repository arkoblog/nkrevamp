import React, { Component } from 'react';
import Modal from 'react-modal';
import Comment from '../comment';

import './styles.scss'; //eslint-disable-line


const modalStyles = {
  overlay: {
    zIndex: 2000,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    zIndex: 2000,
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    minWidth: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',

  },
};

class CommentModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal() {
    this.setState({
      isOpen: true,
    });
  }

  onCloseModal() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div className="row">
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Minimal Modal Example"
          style={modalStyles}
          onRequestClose={this.onCloseModal}
        >
          <Comment afterCommentSubmission={this.props.afterCommentSubmission} modal onCloseModal={this.onCloseModal} type={this.props.type} id={this.props.id} />
        </Modal>

        <div className="col-md-12 pad-t-s pad-b-s ">
          <button className="btn btn-danger  width-100 uppercase" onClick={this.onOpenModal}><small>Leave a comment</small></button>
        </div>

      </div>

    );
  }
}


export default CommentModal;
