/**
 * External dependencies
 */
import loremIpsum from "lorem-ipsum";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { ButtonGroup, Button, BaseControl } = wp.components;
const { Component, Fragment } = wp.element;
const { withDispatch } = wp.data;
const { createBlock } = wp.blocks;

/**
 * Internal dependencies
 */
import options from "../options";

class Generator extends Component {
  constructor() {
    super(...arguments);

    this.onChangeContentType = this.onChangeContentType.bind(this);
    this.onChangeListType = this.onChangeListType.bind(this);
    this.onChangeCount = this.onChangeCount.bind(this);
    this.onInsertContent = this.onInsertContent.bind(this);
    this.addParagraph = this.addParagraph.bind(this);
    this.addList = this.addList.bind(this);
    this.randomInteger = this.randomInteger.bind(this);

    this.state = {
      contentType: "",
      listType: "",
      count: 5
    };
  }

  onChangeContentType(newType) {
    this.setState({ contentType: newType });
  }

  onChangeListType(newType) {
    this.setState({ listType: newType });
  }

  onChangeCount(event) {
    this.setState({ count: event.target.value });
  }

  onInsertContent() {
    "paragraph" === this.state.contentType
      ? this.addParagraph()
      : this.addList();
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addParagraph() {
    let counter = 1;

    while (counter <= this.state.count) {
      const dummyContent = loremIpsum({
        count: 1, // Number of words, sentences, or paragraphs to generate.
        units: "paragraphs", // Generate words, sentences, or paragraphs.
        sentenceLowerBound: 5, // Minimum words per sentence.
        sentenceUpperBound: 15, // Maximum words per sentence.
        paragraphLowerBound: 5, // Minimum sentences per paragraph.
        paragraphUpperBound: 15, // Maximum sentences per paragraph.
        format: "plain" // Plain text or html
      });

      const block = createBlock("core/paragraph", {
        content: dummyContent
      });

      this.props.insertBlock(block);
      counter++;
    }
  }

  addList() {
    let counter = 1;

    while (counter <= this.state.count) {
      let itemCounter = 1;
      let listItems = [];
      const listLength = this.randomInteger(5, 10);

      while (itemCounter <= listLength) {
        const dummyContent = loremIpsum({
          count: this.state.count, // Number of words, sentences, or paragraphs to generate.
          units: "words" // Generate words, sentences, or paragraphs.
        });
        listItems.push(<li key={itemCounter}> {dummyContent} </li>);

        itemCounter++;
      }

      const block = createBlock("core/list", {
        nodeName: this.state.listType,
        values: listItems
      });

      this.props.insertBlock(block);

      counter++;
    }
  }

  render() {
    const { contentType, listType } = this.state;
    return (
      <div className="dummynator-sidebar__wrapper">
        <BaseControl id="content-type" label="Content Type">
          <ButtonGroup aria-label={__("Content Type")}>
            {options.contentType.map(type => {
              return (
                <Button
                  key={type.label}
                  isLarge
                  isPrimary={contentType === type.value}
                  aria-pressed={contentType === type.value}
                  onClick={() => this.onChangeContentType(type.value)}
                >
                  {type.label}
                </Button>
              );
            })}
          </ButtonGroup>
        </BaseControl>

        {"list" === contentType && (
          <BaseControl id="list-type" label="List Type">
            <ButtonGroup aria-label={__("List Type")}>
              {options.listType.map(type => {
                return (
                  <Button
                    key={type.label}
                    isLarge
                    isPrimary={listType === type.value}
                    aria-pressed={listType === type.value}
                    onClick={() => this.onChangeListType(type.value)}
                  >
                    {type.label}
                  </Button>
                );
              })}
            </ButtonGroup>
          </BaseControl>
        )}

        {("paragraph" === contentType ||
          ("list" === contentType && listType)) && (
          <Fragment>
            <BaseControl id="item-count" label="Count">
              <input
                name="count"
                onChange={this.onChangeCount}
                value={this.state.count}
                type="number"
                placeholder="Count"
                min="1"
                max="100"
              />
            </BaseControl>

            <Button isPrimary onClick={this.onInsertContent}>
              {__("Add Content")}
            </Button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withDispatch(dispatch => ({
  insertBlock: dispatch("core/editor").insertBlock
}))(Generator);
