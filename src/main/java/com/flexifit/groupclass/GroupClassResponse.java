package com.flexifit.groupclass;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupClassResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime activityDay;
    private Integer capacity;
}