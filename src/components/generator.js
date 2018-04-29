/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { ButtonGroup, Button, BaseControl } = wp.components;
const { Component, Fragment } = wp.element;

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
    console.log("Insert Clicked");
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

export default Generator;
