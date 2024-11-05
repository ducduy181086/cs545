package edu.miu.cs545.lab05.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Exception {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long transactionId;
    LocalDateTime datetime;
    String principal;
    String operation;
    String exception_type;
}
