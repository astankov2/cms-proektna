import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import DashboardView from './components/dashboard/DashboardView';
import DataTableView from './components/dashboard/DataTableView';
import CreatePostView from './components/dashboard/CreatePostView';
import EditPostView from './components/dashboard/EditPostView';
import PostListView from './components/display/PostListView';
import PostView from './components/display/PostView';

class App extends Component {
  render() {
    return (
      <div className="App" id="App">
        <BrowserRouter>
          <div>
            <Route path="/" exact component={DashboardView} />

            { /* Posts */ }
            <Route path="/posts/" exact component={PostListView} />
            <Route path="/posts/:id" exact component={PostView} />

            { /* Dashboard */ }
            <Route path="/dashboard" exact component={DashboardView} />
            <Route path="/dashboard/table" exact component={DataTableView} />
            <Route path="/dashboard/create" exact component={CreatePostView} />
            <Route path="/dashboard/edit/:id" exact component={EditPostView} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
