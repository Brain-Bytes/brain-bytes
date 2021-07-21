import React, { useState, useEffect } from 'react';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import MDEditor, { commands } from '@uiw/react-md-editor';
import * as Showdown from 'showdown';
import CreatableSelect from 'react-select/creatable';
import { gql } from '@apollo/client';
import Button from '../reusables/Button';
import { useHistory } from "react-router-dom";

import { getTags } from '../services/TagService';
import { addByte } from '../services/ByteService';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const ADD_BYTE_MUTATION = gql`
  mutation NewByte($title: String!, $body: String!, $userId: ID!, $tags: [TagInput!]) {
    addByte(input: { params: { title: $title, body: $body, userId: $userId, tags: $tags } }) {
      byte {
        id
        title
        body
        createdAt
      }
    }
  }
`;

const ByteForm = () => {
  let history =  useHistory();

  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [charCounter, setCharCounter] = useState(0);

  useEffect(() => {
    getTags()
      .then(
        (res) => setTags(res.data.data.fetchTags),
        (error) => console.log('error', error)
      )
  }, []);

  useEffect(() => {
    const htmlValue = converter.makeHtml(body);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlValue;
    const strippedValue = wrapper.textContent;
    setCharCounter(strippedValue.split('').length);
  }, [body]);

  const handleChangeTagsSelection = (newValue) => {
    setSelectedTags(newValue.map((value) => ({ name: value.value })));
  };

  const handleCreateNewTag = (value) => {
    const input = value.replace(/\s+/g, '-').toLowerCase();
    setNewTag(input);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
    })
  };

  const handleSubmitByte = () => {
    if (!title || !body || selectedTags.length === 0) return setErrorMessage('Be sure to fill in the title, body and tags input');

    const variables = {
      title,
      body,
      userId: localStorage.getItem('userId'),
      tags: selectedTags,
    };

    addByte(ADD_BYTE_MUTATION, variables)
      .then((res) => {
        res.data.errors
          ? setErrorMessage('Oops! Something went wrong. Refresh the page and try again or contact me.')
          : history.push('/');
      })
      .catch(() => setErrorMessage('Oops! Something went wrong. Refresh the page and try again or contact me.'));
  };

  return (
    <div className="container px-0 mt-2">
      <label className='text-white' htmlFor="title">Title</label>
      <input
        placeholder="Byte title"
        type="text"
        id="title"
        className="p-2 mb-4 text-black w-100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label className='text-white' htmlFor="body">Body</label>
      <MDEditor
        placeholder="Write your knowledge"
        value={body}
        onChange={setBody}
        commands={[commands.bold, commands.italic, commands.code, commands.link]}
      />

      <p className="mt-2 text-sm text-white">Maximum length: {charCounter}/600</p>
      <label className='text-white' htmlFor="creatable-select">Tags</label>
      <div className="justify-between mt-2 d-flex align-items-baseline">
        <CreatableSelect
          isClearable
          isMulti
          onInputChange={handleCreateNewTag}
          inputValue={newTag}
          onChange={handleChangeTagsSelection}
          options={tags.map((tag) => ({ label: tag.name, value: tag.name }))}
          className="flex-1 mr-4 text-black"
          styles={customStyles}
          placeholder="Select or create up to 3 tags"
          id="creatable-select"
        />
        <Button
          className="p-2 text-white bg-green-light shadow-light active:bg-green-dark"
          text="Add Byte"
          icon={faBrain}
          action={handleSubmitByte}
        />
      </div>
      {errorMessage && (
        <p className='mt-2 text-red-500'>{errorMessage}</p>
      )}
    </div>
  )
};

export default ByteForm;
