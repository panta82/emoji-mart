"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _svgs = require("../svgs");

var _nimbleEmojiIndex = _interopRequireDefault(require("../utils/emoji-index/nimble-emoji-index"));

var _index = require("../utils/index");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var id = 0;

var Search = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(Search, _React$PureComponent);

  var _super = _createSuper(Search);

  function Search(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Search);
    _this = _super.call(this, props);
    _this.state = {
      icon: _svgs.search.search,
      isSearching: false,
      id: ++id
    };
    _this.data = props.data;
    _this.emojiIndex = new _nimbleEmojiIndex["default"](_this.data);
    _this.setRef = _this.setRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.clear = _this.clear.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleKeyUp = _this.handleKeyUp.bind((0, _assertThisInitialized2["default"])(_this)); // throttle keyboard input so that typing isn't delayed

    _this.handleChange = (0, _index.throttleIdleTask)(_this.handleChange.bind((0, _assertThisInitialized2["default"])(_this)));
    return _this;
  }

  (0, _createClass2["default"])(Search, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // in some cases (e.g. preact) the input may already be pre-populated
      // this.input is undefined in Jest tests
      if (this.input && this.input.value) {
        this.search(this.input.value);
      }
    }
  }, {
    key: "search",
    value: function search(value) {
      if (value == '') this.setState({
        icon: _svgs.search.search,
        isSearching: false
      });else this.setState({
        icon: _svgs.search["delete"],
        isSearching: true
      });
      this.props.onSearch(this.emojiIndex.search(value, {
        emojisToShowFilter: this.props.emojisToShowFilter,
        maxResults: this.props.maxResults,
        include: this.props.include,
        exclude: this.props.exclude,
        custom: this.props.custom
      }));
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.input.value == '') return;
      this.input.value = '';
      this.input.focus();
      this.search('');
    }
  }, {
    key: "handleChange",
    value: function handleChange() {
      this.search(this.input.value);
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.clear();
      }
    }
  }, {
    key: "setRef",
    value: function setRef(c) {
      this.input = c;
    }
  }, {
    key: "render",
    value: function render() {
      var _React$createElement;

      var _this$props = this.props,
          i18n = _this$props.i18n,
          autoFocus = _this$props.autoFocus,
          emoji = _this$props.emoji,
          pickerId = _this$props.pickerId;
      var _this$state = this.state,
          icon = _this$state.icon,
          isSearching = _this$state.isSearching,
          id = _this$state.id;
      var inputId = "emoji-mart-search-".concat(id);
      var descriptionId = 'emoji-mart-search-description';
      return /*#__PURE__*/_react["default"].createElement("section", {
        className: "emoji-mart-search",
        "aria-label": i18n.search
      }, /*#__PURE__*/_react["default"].createElement("input", (_React$createElement = {
        id: inputId,
        ref: this.setRef,
        onChange: this.handleChange,
        placeholder: i18n.search,
        autoFocus: autoFocus,
        type: "text"
      }, (0, _defineProperty2["default"])(_React$createElement, "placeholder", "Search"), (0, _defineProperty2["default"])(_React$createElement, "role", "textbox"), (0, _defineProperty2["default"])(_React$createElement, "aria-owns", pickerId), (0, _defineProperty2["default"])(_React$createElement, "aria-label", "Search for an emoji"), (0, _defineProperty2["default"])(_React$createElement, "aria-describedby", descriptionId), (0, _defineProperty2["default"])(_React$createElement, "aria-activedescendant", emoji ? "emoji-mart-".concat(emoji.id) : ''), _React$createElement)), /*#__PURE__*/_react["default"].createElement("label", {
        className: "emoji-mart-sr-only",
        htmlFor: inputId,
        id: descriptionId
      }, i18n.search, ": Use the left, right, up and down arrow keys to navigate the emoji search results. Use escape key to deselect an emoji and focus on search bar."), /*#__PURE__*/_react["default"].createElement("button", {
        className: "emoji-mart-search-icon",
        onClick: this.clear,
        onKeyUp: this.handleKeyUp,
        "aria-label": i18n.clear,
        disabled: !isSearching
      }, icon()));
    }
  }]);
  return Search;
}(_react["default"].PureComponent);

exports["default"] = Search;
Search.propTypes
/* remove-proptypes */
= {
  emoji: _propTypes["default"].object,
  onSearch: _propTypes["default"].func,
  maxResults: _propTypes["default"].number,
  emojisToShowFilter: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool
};
Search.defaultProps = {
  emoji: null,
  onSearch: function onSearch() {},
  maxResults: 75,
  emojisToShowFilter: null,
  autoFocus: false
};