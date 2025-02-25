import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm({
  postArticle,
  currentArticleId,
  setCurrentArticleId,
  articles,
  updateArticle,
}) {
  const [values, setValues] = useState(initialFormValues);
  // ✨ where are my props? Destructure them here

  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    if (currentArticleId) {
      setValues(...articles.filter((art) => art.article_id === currentArticleId));
    } else setValues(initialFormValues);
  }, [currentArticleId]);

  const changeHandler = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    if (!currentArticleId) {
      postArticle({ ...values });
      setValues(initialFormValues);
    } else {
      setValues(initialFormValues);
      updateArticle(currentArticleId, { ...values });
    }
    setCurrentArticleId(null);
  };

  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values
    const currentArticle = articles.find((art) => art.article_id === currentArticleId);

    if (!currentArticleId && values.title && values.text && values.topic) {
      return false;
    } else if (
      currentArticleId &&
      (values.title !== currentArticle.title ||
        values.text !== currentArticle.text ||
        values.topic !== currentArticle.topic)
    ) {
      return false;
    } else return true;
  };

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={submitHandler}>
      {currentArticleId ? <h2>Edit Article</h2> : <h2>Create Article</h2>}
      <input
        maxLength={50}
        onChange={changeHandler}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={changeHandler}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={changeHandler} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">
          Submit
        </button>
        {currentArticleId ? (
          <button
            onClick={() => {
              setValues(initialFormValues);
              setCurrentArticleId(null);
            }}
            type="button">
            Cancel edit
          </button>
        ) : null}
      </div>
    </form>
  );
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
