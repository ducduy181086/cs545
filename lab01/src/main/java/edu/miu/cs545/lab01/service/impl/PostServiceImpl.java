package edu.miu.cs545.lab01.service.impl;

import edu.miu.cs545.lab01.entity.Post;
import edu.miu.cs545.lab01.entity.dto.PostDto;
import edu.miu.cs545.lab01.repository.PostRepo;
import edu.miu.cs545.lab01.service.PostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepo postRepo;
    private final ModelMapper modelMapper;

    @Override
    public List<PostDto> getAll() {
        return postRepo.getAllPosts().stream().map(post -> modelMapper.map(post, PostDto.class)).toList();
    }

    @Override
    public PostDto getById(long id) {
        return modelMapper.map(postRepo.getPostById(id), PostDto.class);
    }

    @Override
    public List<PostDto> getByAuthor(String value) {
        return postRepo.getPostsByAuthor(value).stream().map(post -> modelMapper.map(post, PostDto.class)).toList();
    }

    @Override
    public void save(PostDto postDto) {
        postRepo.save(modelMapper.map(postDto, Post.class));
    }

    @Override
    public boolean delete(long id) {
        return postRepo.delete(id);
    }
}
