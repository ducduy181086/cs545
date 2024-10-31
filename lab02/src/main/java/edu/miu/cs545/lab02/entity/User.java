package edu.miu.cs545.lab02.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String name;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @Fetch(FetchMode.SUBSELECT)
    @JoinColumn(name = "user_id")
    List<Post> posts;
}
