import React from "react";
import { Card, Button } from "react-bootstrap";
import UserAvatar from "../userAvatar/UserAvatar";
import styles from "./TripSummary.module.css"

function TripSummary(props) {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <div className={styles.container}>
            <div className={styles.cardtop}>
              <div className={styles.timetable}>
              </div>  
              <div className={styles.locations}>
              </div>
              <div className={styles.pricing}>

              </div>
            </div>
          </div>
          <div className={styles.cardbottom}>
            <UserAvatar user={props.}
          </div>            
        </Card.Body>
      </Card>
    );
  }
  
  export default TripSummary;