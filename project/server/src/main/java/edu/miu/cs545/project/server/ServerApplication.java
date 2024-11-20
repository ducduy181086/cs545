package edu.miu.cs545.project.server;

import edu.miu.cs545.project.server.entity.Product;
import edu.miu.cs545.project.server.entity.dto.request.SaveProductRequest;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.addMappings(new PropertyMap<SaveProductRequest, Product>() {
			@Override
			protected void configure() {
				skip(destination.getAverageRating());
				skip(destination.getReviewCount());
			}
		});

		return modelMapper;
	}
}
