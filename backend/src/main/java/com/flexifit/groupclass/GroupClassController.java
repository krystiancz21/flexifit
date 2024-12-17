package com.flexifit.groupclass;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/group-classes")
@RequiredArgsConstructor
public class GroupClassController {

    private final GroupClassService groupClassService;

    @GetMapping
    public ResponseEntity<List<GroupClass>> getAllGroupClasses() {
        List<GroupClass> groupClasses = groupClassService.getAllGroupClasses();
        return ResponseEntity.ok(groupClasses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupClassById(@PathVariable Long id) {
        try {
            return groupClassService.getGroupClassById(id)
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new IllegalArgumentException("Group class not found with ID: " + id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createGroupClass(@Valid @RequestBody GroupClass groupClass, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        try {
            GroupClass createdGroupClass = groupClassService.createGroupClass(groupClass);
            return ResponseEntity.ok(createdGroupClass);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGroupClass(
            @PathVariable Long id,
            @Valid @RequestBody GroupClass groupClassDetails,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        try {
            return groupClassService.updateGroupClass(id, groupClassDetails)
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new IllegalArgumentException("Group class not found with ID: " + id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGroupClass(@PathVariable Long id) {
        try {
            if (groupClassService.deleteGroupClass(id)) {
                return ResponseEntity.ok("Deleted group class with ID: " + id);
            }
            throw new IllegalArgumentException("Group class not found with ID: " + id);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/{classId}/purchased-by/{userId}")
    public ResponseEntity<?> purchaseGroupClass(
            @PathVariable Long classId,
            @PathVariable Long userId
    ) {
        try {
            GroupClass groupClass = groupClassService.buyGroupClass(classId, userId);
            GroupClassResponse groupClassResponse = GroupClassResponse.builder()
                    .id(groupClass.getId())
                    .name(groupClass.getName())
                    .description(groupClass.getDescription())
                    .activityDay(groupClass.getActivityDay())
                    .capacity(groupClass.getCapacity())
                    .build();
            return ResponseEntity.ok(groupClassResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
