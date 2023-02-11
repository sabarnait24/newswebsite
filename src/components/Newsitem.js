import React, { Component } from "react";
import { Button } from "react-daisyui";


export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div class="container my-3">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={imageUrl} alt="." />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <p class="card-text">
              <small class="text-muted">
                By {author ? author : "UNKNOWN"} on {date}
              </small>
            </p>
            <div className="card-actions justify-end">
              <Button
                className="btn btn-primary"
                href={newsUrl}
                target="_blank"
              >
                Read More
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
