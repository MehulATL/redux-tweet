import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'components'
import * as modalActionCreators from 'redux/modules/modal'
import * as tweetsActionCreators from 'redux/modules/tweets'

/*
  we aren't using a ModalContainer component and exporting the high-order component
  returned by wrapping the Modal component in the connect fn instead
  because we aren't gonna use any life-cycle methods on a ModelContainer component
  or use state in it.
*/

function mapStateToProps ({modal, users}, props) {
  const tweetTextLength = modal.tweetText.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    tweetText: modal.tweetText,
    isOpen: modal.isOpen,
    isSubmitDisabled: tweetTextLength <= 0 || tweetTextLength > 140
  }
}
function mapDispatchToProps (dispatch, props) {
  return bindActionCreators({...modalActionCreators, ...tweetsActionCreators}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
