package edu.miu.cs545.project.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "approvedByAdmin", cascade = CascadeType.ALL)
    private List<Seller> approvedSellers;

    @OneToMany(mappedBy = "deletedByAdmin", cascade = CascadeType.ALL)
    private List<Review> deletedReviews;
}
