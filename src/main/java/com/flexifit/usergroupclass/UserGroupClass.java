package com.flexifit.usergroupclass;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.flexifit.groupclass.GroupClass;
import com.flexifit.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_group_classes")
public class UserGroupClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

     @ManyToOne
     @JoinColumn(name = "user_id", nullable = false)
     @JsonIgnore
     private User user;

     @ManyToOne
     @JoinColumn(name = "group_class_id", nullable = false)
     @JsonIgnore
     private GroupClass groupClass;
}
