import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

const modalStyles = {
  top: "12%",
  left: "25%",
  width: "50%"
};

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  title: {
    fontWeight: "bold",
    color: "red",
    fontSize: 24
  },
  label: {
    fontWeight: 500,
    fontSize: 18
  }
});

class DetailsModal extends React.Component {
  state = {
    open: false
  };

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    const { classes, isOpen, currency, data } = this.props;
    const quote = data.quotes[currency] ? data.quotes[currency] : null;

    return (
      <Modal open={isOpen} onClose={this.closeModal}>
        <div style={modalStyles} className={classes.paper}>
          <Typography
            className={classes.title}
            variant="title"
            align="center"
            gutterBottom
          >
            Cryptocurrency details
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Name: {data.name}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Symbol: {data.symbol}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Rank: {data.rank}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Circulating supply: {data.circulating_supply}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Total supply: {data.total_supply}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Max supply: {data.max_supply}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Value / Price: {currency} {quote && quote.price}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Daily volume: {quote && quote.volume_24h}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Market cap: {quote && quote.market_cap}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Hourly % change: {quote && quote.percent_change_1h}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Daily % change: {quote && quote.percent_change_24h}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Weekly % change: {quote && quote.percent_change_7d}
          </Typography>
          <Typography className={classes.label} gutterBottom>
            Last updated:{" "}
            {moment.unix(data.last_updated).format("MMMM Do YYYY at h:mm:ss a")}
          </Typography>
        </div>
      </Modal>
    );
  }
}

DetailsModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsModal);
