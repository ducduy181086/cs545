package edu.miu.cs545.lab01.service;

import edu.miu.cs545.lab01.entity.dto.PostDto;

import java.util.List;

public interface PostService {
    List<PostDto> getAll();
    PostDto getById(long id);
    List<PostDto> getByAuthor(String value);
    void save(PostDto postDto);
    boolean delete(long id);
}
