import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Immutable from 'immutable';
// import FacebookProvider, { Comments } from 'react-facebook';
import { addComments } from '../../../actions';


import './styles.scss'; //eslint-disable-line


class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      comment: '',
      commentimages: Immutable.Map(), //eslint-disable-line
      imageId: 0,
    };

    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.renderImageUpload = this.renderImageUpload.bind(this);
  }
  onChange(e) { //eslint-disable-line
    switch (e.target.name) {
      case 'name':
        this.setState({
          name: e.target.value,
        });
        break;
      case 'comment':
        this.setState({
          comment: e.target.value,
        });
        break;
      default:
        break;
    }
  }

  onCommentSubmit(e) { //eslint-disable-line
    e.preventDefault();
    console.log('submitted');
    const comment = new FormData();

    comment.append('name', this.state.name);
    comment.append('comment', this.state.comment);

    this.state.commentimages.entrySeq().forEach(([imageId, image]) => {
      comment.append(imageId, image);
    });

    this.props.addComments(comment, this.props.type, this.props.id);

    document.getElementById('comment-form').reset();

    this.setState({
      name: '',
      comment: '',
      commentimages: Immutable.Map(), //eslint-disable-line
      imageId: 0,
    });

    this.props.afterCommentSubmission();
    if (this.props.modal) {
      this.props.onCloseModal();
    }
  }

  onImageDrop(accepted, rejected) {
    accepted.map((image) => {
      return this.setState({
        commentimages: this.state.commentimages.set(this.state.imageId, image),
        imageId: this.state.imageId + 1,
      });
    });
    if (rejected.length > 0) {
      if (rejected[0].size > 50000) {
        // this.props.addNotif({
        //   message: 'File size must be less than 500KB',
        //   level: 'warning',
        //   label: 'Ok',
        // });
      } else if (rejected[0].type !== 'image/jpeg' || rejected[0].type !== 'image/png') {
        // this.props.addNotif({
        //   message: 'Invalid file format',
        //   level: 'warning',
        //   label: 'OK',
        // });
      }
    }
  }


  renderImageUpload() {
    return (
      <div className="">
        <div className="text-black">

          <Dropzone
            id="img-drop"
            accept="image/jpeg, image/png"
            onDrop={this.onImageDrop}
            multiple={false}
            maxSize={500000}
            className="mar-b-m pad-m border-grey dropzone mar-b-m"
          >
            <p>Click here to upload images.</p>
          </Dropzone>
          {
          this.state.commentimages.entrySeq().map(([imageId, image]) => {
            return (
              <div className="card grey-bg pad-r-s mar-b-s" key={imageId}>
                <div className="card-block no-pad">
                  <span className="">{image.name}</span>
                  <button className="btn btn-sm float-right"
                    value={imageId}
                    type="button"
                    onClick={(e) => {
                    const id = parseInt(e.target.value, 10);
                    this.setState({ commentimages: this.state.commentimages.delete(id) });
                  }}
                  >&#10006;
                  </button>
                </div>
              </div>
            );
          })
        }

        </div>
      </div>
    );
  }


  render() {
    return (
      <div className="row pad-t-l pad-b-s">
        <div className="col-md-12">
          <hr />
          <p className="uppercase">Leave a comment</p>
          <form id="comment-form" className="form-group" onSubmit={this.onCommentSubmit}>
            <input className="form-control " name="name" onChange={this.onChange} placeholder="Enter your name" />
            <br />
            <textarea name="comment" onChange={this.onChange} className="form-control" id="comment" placeholder="Enter your comment here" /><br />
            {this.renderImageUpload()}
            <input type="submit" value="Submit" className="btn btn-primary width-100" />
          </form>

        </div>
      </div>
    );
  }
}


const mapStateToProps = state => (
  {
  }
);


export default withRouter(connect(mapStateToProps, { addComments })(AddComment));
