import React, { useState } from "react";

import Container from "./atoms/Container.js";
import Header1 from "./atoms/Header1.js";
import Header2 from "./atoms/Header2.js";
import Paragraph from "./atoms/Paragraph.js";
import TextBox from "./atoms/TextBox.js";
import Button from "./atoms/Button.js";

function Dashboard() {
  const samplePosts = [
    { id: 111, title: "Happiness", author: "John" },
    { id: 112, title: "MIU", author: "Dean" },
    { id: 113, title: "Enjoy Life", author: "Jasmine" }
  ];

  const [selectedValue, setSelectedValue] = useState({ id: "N/A", title: "Select a post to see details", author: "N/A" });
  const [posts, setPosts] = useState(samplePosts);
  const [title, setTitle] = useState("");

  const handleChangeDetail = (e, item) => {
    setSelectedValue(item);
  }

  const handleChangeValue = (e) => {
    posts[0].title = title;
    setPosts([...posts]);
  }

  const handleEdit = (e) => {
    console.log("Edit button clicked!");
  }

  const handleDelete = (e) => {
    console.log("Delete button clicked!");
  }

  return (
    <Container className="bg-blue-50 text-gray-800 p-8 min-h-screen">
      <Container className="max-w-3xl mx-auto">
        <Header1 className="text-4xl font-bold text-center mb-8 text-blue-600">Dashboard</Header1>

        <Container className="mb-6">
          <Header2 className="text-2xl font-semibold text-blue-500 mb-4">Posts</Header2>
          <Container className="grid grid-cols-1 gap-4">
            {posts.map(m => (
              <Container key={m.id}
                className="p-4 bg-white rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 hover:bg-blue-100"
                onClick={(e) => handleChangeDetail(e, m)}>
                <Paragraph className="text-lg font-semibold text-blue-700">Title: {m.title}</Paragraph>
                <Paragraph className="text-gray-500">Id: {m.id}</Paragraph>
                <Paragraph className="text-gray-500">Author: {m.author}</Paragraph>
              </Container>))}
          </Container>
        </Container>

        <Container className="mb-6 flex items-center space-x-2">
          <TextBox
            className="p-2 w-full rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}></TextBox>
          <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700" onClick={handleChangeValue}>Change</Button>
        </Container>

        <Container className="p-6 bg-white rounded-lg shadow-md">
          <Header2 className="text-2xl font-semibold text-blue-500 mb-4">Post Detail</Header2>
          <Paragraph className="text-lg"><strong>Id:</strong> <span className="text-gray-600">{selectedValue.id}</span></Paragraph>
          <Paragraph className="text-lg"><strong>Title:</strong> <span className="text-blue-700">{selectedValue.title}</span></Paragraph>
          <Paragraph className="text-lg"><strong>Author:</strong> <span className="text-gray-600">{selectedValue.author}</span></Paragraph>
          <Container className="mt-4 flex space-x-2">
            <Button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600" onClick={handleEdit}>Edit</Button>
            <Button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600" onClick={handleDelete}>Delete</Button>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Dashboard;
