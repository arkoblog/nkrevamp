import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import { ROOT_URL } from '../../../actions';


import './styles.scss'; //eslint-disable-line


class RenderComments extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  renderImage(images) {//eslint-disable-line
    const galleryImages = [];
    images.forEach((image) => {
      galleryImages.push({
        src: `${ROOT_URL}/media/${image.path}`,
        thumbnail: `${ROOT_URL}/media/${image.path}`,
        thumbnailWidth: 320,
        thumbnailHeight: 320,
      });
    });

    return <div className="mar-t-s mar-b-l row-fluid"><Gallery enableImageSelection={false} images={galleryImages} rowHeight={60} /><br /></div>;
  }

  render() {
    const { comments } = this.props;
    if (comments.length !== 0) {
      return (
        <div>
          <hr />
          <p className="uppercase">All comments</p>
          {comments.map((comment, i) => {
            const key = i;
            return (
              <div key={key} className="card grey-bg mar-t-s no-border comment-card">
                <div className="card-block comment-card-block ">
                  {comment.name !== '' && <span className="bold">{comment.name} </span>}
                  {comment.name === '' && <span className="bold">Anonymous </span>}
                  <span>{comment.comment}</span>
                  {comment.commentimages.length !== 0 && this.renderImage(comment.commentimages)}

                </div>
              </div>

            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <hr />
          <p className="uppercase">All comments</p>
          <div className="card grey-bg mar-t-s no-border comment-card">
            <div className="card-block  comment-card-block">
            There are no comments posted.
            </div>
          </div>
        </div>
      );
    }
  }
}


export default RenderComments;
