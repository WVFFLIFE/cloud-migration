import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Button from '../Button'
import DragElement from '../DragElement';
import Loader from '../Loader';
import Search from '../Search';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from "uuid";

const useStyles = makeStyles(() => ({
  root: {
    padding: '30px 20px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  block: {
    width: '50%',
    border: '1px solid #CCCCCC',
    '&:last-child': {
      borderLeft: 'none'
    }
  },
  header: {
    padding: '20px 45px',
    borderBottom: '1px solid #CCCCCC'
  },
  content: {
    minHeight: 475,
    maxHeight: 475,
    padding: '30px 20px',
    paddingBottom: 10,
    textAlign: 'center',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 5,
      background: '#fff'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#E5E8EC',
      borderRadius: 2
    }
  },
  title: {
    fontSize: 14,
    fontWeight: 400,
    color: '#302846',
    textTransform: 'uppercase'
  },
  paragraph: {
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    color: '#878787'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyItem: {
    marginBottom: 20,
    marginLeft: 20,
    height: 40,
    background: '#fff',
    border: '1px dashed #CCCCCC',
  },
  wrapper: {
    paddingTop: 10,
    paddingRight: 10,
    height: '100%',
    minHeight: 430,
    maxHeight: 430,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 5,
      background: '#fff'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#E5E8EC'
    }
  },
  searchContent: {
    padding: '30px 10px',
    paddingLeft: 20,
    paddingTop: 10,
    minHeight: 'auto',
    overflow: 'hidden'
  },
  loading: {
    minHeight: 'auto',
    height: 'auto'
  },
}))

const MapUserView = (props) => {
  const classes = useStyles();
  const [text, setText] = useState('');

  const handleTextChange = e => {
    setText(e.target.value)
  }

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === 'target') {
      let target = targetList.find(item => item.guid === result.draggableId);

      props.handleSetToSource(
        destination.droppableId,
        {...target, guid: uuid()}
      )
    } else {
      let item = sourceList.find(item => item.target ? item.target.guid === result.draggableId : null);

      props.handleSetToSource(
        destination.droppableId,
        item.target
      )
    }
  }

  const { sourceList, targetList, title, filterField, type } = props;

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <p className={classes.paragraph}>
          {title}
        </p>
        <Button
          disabled={props.loading}
          type="button"
          handleClick={props.handleAutomap}
        >
          Automap
        </Button>
      </div>
      <div className={classes.container}>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <div className={classes.block}>
            <div className={classes.header}>
              <span className={classes.title}>Source system</span>
            </div>
            <div className={clsx(classes.content, {
              [classes.loading]: props.loading
            })}>
              {props.loading ? <Loader /> : sourceList.map(({ source, target }, index) => {
                return (
                  <React.Fragment key={source.guid}>
                    <DragElement
                      data={source}
                      sub={false}
                      type={type}
                    />
                    <Droppable
                      isDropDisabled={!!target}
                      droppableId={source.guid}
                    >
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                          {target ? (
                            <>
                              <Draggable
                                draggableId={target.guid}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <DragElement
                                      data={target}
                                      sub={true}
                                      handleCancel={props.handleRemoveFromSource}
                                      type={type}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    />
                                  )
                                }}
                              </Draggable>
                              {provided.placeholder}
                            </>
                          ) : (
                              <>
                                <div
                                  className={classes.emptyItem}
                                ></div>
                                <span style={{ display: 'none' }}>
                                  {provided.placeholder}
                                </span>
                              </>
                            )}
                        </div>
                      )}
                    </Droppable>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
          <div className={classes.block}>
            <div className={classes.header}>
              <span className={classes.title}>Target system</span>
            </div>
            <div className={clsx(classes.content, classes.searchContent, {
              [classes.loading]: props.loading
            })}>
              {props.loading ? null : (
                <Search
                  text={text}
                  handleTextChange={handleTextChange}
                />
              )}
              <Droppable 
                droppableId="target"
                isDropDisabled
              >
                {(provided, snapshot) => (
                  <div
                    className={clsx(classes.wrapper, {
                      [classes.loading]: props.loading
                    })}
                    ref={provided.innerRef}
                  >
                    {props.loading ? (
                      <Loader />
                    ) : targetList
                      .filter(item => item[filterField].toLowerCase().includes(text))
                      .map((item, index) => (
                        <Draggable
                          key={item.guid}
                          draggableId={item.guid}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <>
                              <DragElement
                                data={item}
                                withDragIcon={true}
                                ref={provided.innerRef}
                                type={type}
                                style={provided.draggableProps.style}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              />
                              {snapshot.isDragging && (
                                <DragElement
                                  data={item}
                                  withDragIcon={true}
                                  type={type}
                                  dragging
                                />
                              )}
                            </>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default MapUserView;