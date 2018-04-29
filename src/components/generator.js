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

    console.log("Insert Clicked" + this.state.contentType);
  }

  addParagraph() {
    const block = createBlock("core/paragraph", {
      content: "Gutenberg Gangsta"
    });
    this.props.insertBlock(block);
  }

  addList() {
    const block = createBlock("core/list", {
      nodeName: this.state.listType,
      values: [<li key="riad">Riad</li>, <li key="ajit">Ajit</li>]
    });
    this.props.insertBlock(block);
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
            <ButtonGroup aria-label={__("list Type")}>
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
            <BaseControl id="item-count" label="Item count">
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
