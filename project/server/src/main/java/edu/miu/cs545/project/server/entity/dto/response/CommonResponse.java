package edu.miu.cs545.project.server.entity.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResponse {
    @JsonProperty("status")
    private String status;
    @JsonProperty("error_code")
    private String errorCode;
}
